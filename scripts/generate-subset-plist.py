""" 
Generates a lib.plist (UFO) type file by a subset list of glyphs
"""

import sys

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(
            "Args must be: <subset-list-file> <output-plist-file>")
        sys.exit(1)

    font = open(sys.argv[1], 'r')
    with open(sys.argv[2], 'w') as of:
        rows = ''
        for line in font.readlines():
            if len(line.strip()):
                rows += "<string>{0}</string>\n".format(line.strip())

        output = """<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple Computer//DTD PLIST 1.0//EN"
"http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
	<dict>
		<key>com.schriftgestaltung.Keep Glyphs</key>
		<array>
            {0}
        </array>
	</dict>
</plist>""".format(rows)
        
        of.write(output)
