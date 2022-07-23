import glob
import json
import os
from typing import NamedTuple

class fileInfo:
    def __init__(self, name, time):
        self.name = name
        self.time = time
    def __repr__(self):
        return str((self.name, self.time))

files = glob.glob('../image/**/*.jpg', 
                   recursive = True)

fileInfos = []
for name in files:
    #name = os.path.basename(file)
    time = os.path.getmtime(name)
    name = name.replace("../", "")
    name = name.replace("..\\", "")
    name = name.replace("\\", "/")
    info = fileInfo(name, time)
    fileInfos.append(info.__dict__)
    
fileInfos = sorted(fileInfos, key=lambda x: x["time"], reverse=True)

data = {}
data['images'] = fileInfos
json_data = json.dumps(data)

print(json_data)

f = open("demofile3.json", "w")
f.write(json_data)
f.close()

print("Done!")