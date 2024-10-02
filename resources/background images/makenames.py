import os
import json

cdir = os.path.dirname(os.path.realpath(__file__))

all = [name for name in os.listdir(cdir) if not (name.endswith('json') or name.endswith('py'))]

with open(os.path.join(cdir, "allfiles.json"),'w') as file:
    file.write(json.dumps(all))
