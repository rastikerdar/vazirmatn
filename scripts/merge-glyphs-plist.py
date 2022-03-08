"""
Merges two "contents.plist" files and writes the result into output file
"""

import sys
import xml.etree.ElementTree as ET

if __name__ == "__main__":
    if len(sys.argv) < 4:
        print("Args must be: <input-plist-1> <input-plist-2> <output-plist>")
        sys.exit(1)

    tree1 = ET.parse(sys.argv[1])
    root1 = tree1.getroot()
    dict1 = root1[0]

    tree2 = ET.parse(sys.argv[2])
    root2 = tree2.getroot()
    dict2 = root2[0]

    skip_the_next = False
    for child2 in dict2:
        if skip_the_next:
            skip_the_next = False
            continue

        found_duplicate = False
        
        for child1 in dict1:
            if child2.tag == 'key' and child2.text == child1.text:
                found_duplicate = True
                skip_the_next = True
                break
        if not found_duplicate and not skip_the_next:
            dict1.append(child2)
        
    tree1.write(sys.argv[3], encoding='UTF-8', xml_declaration=True)
