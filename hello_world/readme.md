Apex serverless project for ExploreTech Toronto
https://apex.run/

Before deployment create your lambda function role and update **project.json** with role value. You could also run *apex init* to create new project - role will be created automatically.

*Deploy lambda function*:

apex deploy

*Invoke test function locally*

apex invoke hello

---
**project.json** - Project configuration (specify lambda function role)

**function.json** - Function configuration