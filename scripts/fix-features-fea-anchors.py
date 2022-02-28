import sys
import re
import fontforge

def find_poses(anchor_name, ucode, font):
    font.selection.select(ucode)
    poses = []
    for glyph in font.selection.byGlyphs:
        # if "uni{:04x}".format(glyph.unicode) == ucode.lower() or glyph.glyphname == ucode:
        if glyph.glyphname == ucode:
            anchors = glyph.anchorPoints
            for anchor in anchors:
                name = anchor[0].replace('-', '')
                xpos = anchor[2]
                ypos = anchor[3]
                if name == anchor_name:
                    poses.append((xpos, ypos))
            if len(poses):
                return poses
            raise ValueError('anchor ' + anchor_name + ' not found!')
    raise ValueError('anchor ' + anchor_name + ' not found!')


def fix_pos(anchor_name, line, regular_font, second_font, interpolating_ratio):
    trimmed_line = line.strip()

    # example: pos base [\uniFD1E.fina \uni0621 ] <anchor 418 1005> mark @Anchor110;
    found_strings = re.findall(
        r'pos base \[(.*)\] <anchor -?[0-9]+ -?[0-9]+> mark @' + anchor_name, trimmed_line)

    if not len(found_strings):
        return line

    ucodes = found_strings[0].split(' ')[:-1]

    first_ucode = ucodes[0][1:]

    regular_poses = find_poses(anchor_name, first_ucode, regular_font)
    second_poses = find_poses(anchor_name, first_ucode, second_font)

    regular_x = regular_poses[0][0]
    regular_y = regular_poses[0][1]
    second_x = second_poses[0][0]
    second_y = second_poses[0][1]

    final_x = round(regular_x +
                       ((second_x - regular_x) * interpolating_ratio))
    final_y = round(regular_y +
                       ((second_y - regular_y) * interpolating_ratio))

    final_line = "  pos base [" + " ".join(ucodes) + " ] <anchor " + \
        str(final_x) + ' ' + str(final_y) + \
        "> mark @" + anchor_name + ';\n'

    return final_line


def fix_pos2(anchor_name, text, regular_font, second_font, interpolating_ratio):
    output = text
    # example: 
    # pos ligature \uniFEFC <anchor 922 1558> mark @Anchor109 
    #   ligComponent
    #     <anchor 206 1485> mark @Anchor109 ;
    pattern = r'pos ligature (.*) <anchor -?[0-9]+ -?[0-9]+> mark @' + anchor_name + \
        r'\s*ligComponent\s*<anchor -?[0-9]+ -?[0-9]+> mark @' + anchor_name + ' ;'
    ucodes = []
    for match in re.finditer(pattern, text):
        ucodes.append(match.groups()[0][1:])
        
    for ucode in ucodes:
        pattern = r'pos ligature ' + "\\\\" + ucode + \
            r' <anchor -?[0-9]+ -?[0-9]+> mark @' + anchor_name + \
            r'\s*ligComponent\s*<anchor -?[0-9]+ -?[0-9]+> mark @' + anchor_name + ' ;'

        for match in re.finditer(pattern, output):
            regular_poses = find_poses(anchor_name, ucode, regular_font)
            second_poses = find_poses(anchor_name, ucode, second_font)

            anchorStrings = []
            for i in range(len(regular_poses)):
                regular_x = regular_poses[i][0]
                regular_y = regular_poses[i][1]
                second_x = second_poses[i][0]
                second_y = second_poses[i][1]

                final_x = round(regular_x +
                                ((second_x - regular_x) * interpolating_ratio))
                final_y = round(regular_y +
                                ((second_y - regular_y) * interpolating_ratio))

                anchorStrings.append("<anchor " +
                                     str(final_x) + ' ' + str(final_y) +
                                     "> mark @" + anchor_name)

            final_string = "pos ligature \\" + ucode + " " + \
                anchorStrings[1] + '\n ligComponent \n ' + \
                anchorStrings[0] + ' ;'

            output = output[0:match.span()[0]] + final_string + \
                output[match.span()[1]:]
            break

    return output


if __name__ == "__main__":
    if len(sys.argv) < 7:
        print(
            "Args must be: <anchor-name> <regular-sfd> <second-sfd> <interpolating-ratio> <input-malformed-fea-file> <output-fea-file>")

        sys.exit(1)

    anchor_names = sys.argv[1].split(',')
    regular_font_path = sys.argv[2]
    second_font_path = sys.argv[3]
    interpolating_ratio = float(sys.argv[4])
    malformed_fea_file = sys.argv[5]
    output_fea_file = sys.argv[6]

    regular_font = fontforge.open(regular_font_path)
    second_font = fontforge.open(second_font_path)

    output = ""
    with open(malformed_fea_file) as mf:
        for line in mf.readlines():
            for anchor_name in anchor_names:
                line = fix_pos(
                    anchor_name, line, regular_font, second_font, interpolating_ratio)
            output += line

    for anchor_name in anchor_names:
        output = fix_pos2(anchor_name, output, regular_font,
                        second_font, interpolating_ratio)

    with open(output_fea_file, 'w') as of:
        of.write(output)
