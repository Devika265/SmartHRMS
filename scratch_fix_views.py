import glob, re

paths = glob.glob('backend/apps/*/views.py')
for path in paths:
    with open(path, 'r') as f:
        content = f.read()
    content = re.sub(r'from apps\.roles\.permission import HasModulePermission\n?', '', content)
    content = re.sub(r',\s*HasModulePermission,?', '', content)
    content = re.sub(r'\[IsAuthenticated,\s*HasModulePermission\]', '[IsAuthenticated]', content)
    content = re.sub(r'module_name\s*=\s*".*?"\n', '', content)
    with open(path, 'w') as f:
        f.write(content)
print('Done!')
