#!/usr/bin/env python3
import sys
import re


def anchor_fixer(anchor, amount):
    def fix_line(line):
        trimmed_line = line.strip()
        if not trimmed_line.startswith(r"pos base [") and not trimmed_line.endswith(" mark @"+anchor+";"):
            return line

        found_strings = re.findall(r'<anchor [0-9]+ [0-9]+', trimmed_line)
        if not found_strings:
            return line
        matched_string = found_strings[0]

        xpos, ypos = matched_string.split(" ")[1:]
        final_string = '<anchor ' + xpos + ' ' + str(int(ypos)+amount)
        return line.replace(matched_string, final_string)

    return fix_line


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <anchor-name> <move-amount> <input-fea-file> <output-fea-file>")
        sys.exit(1)

    with open(sys.argv[3]) as f:
        input_lines = f.readlines()

    with open(sys.argv[4], 'w') as f:
        f.write(
            "".join(list(map(anchor_fixer(sys.argv[1], int(sys.argv[2])), input_lines))))
