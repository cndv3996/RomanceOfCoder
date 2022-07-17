import glob
import json
import os

files = glob.glob('../image/**/*.jpg', 
                   recursive = True)

names = []
for name in files:
    #name = os.path.basename(file)
    name = name.replace("../", "")
    name = name.replace("..\\", "")
    name = name.replace("\\", "/")
    names.append(name)

data = {}
data['images'] = names
json_data = json.dumps(data)

print(json_data)

f = open("demofile3.json", "w")
f.write(json_data)
f.close()

print("Done!")