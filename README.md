# training

## Pull Request Process
1. Create the directory for the code (e.g. `packages/e24.1-wtforms`)

2. If sample code (aka starter code) is provided, then
   1. Create a new branch (e.g. `git checkout -b e24.1`)
   2. download the sample code into the newly created directory
   3. commit and push that code
   4. Create the pull request against `main` (e.g. `main` <-- `e24.1`)
   5. Use admin ability to force the merge without approval
   6. Checkout main and pull merged changes
   7. `git checkout e24.1 && git merge main`

3. If 2 was followed skip to 4. Otherwise, create new branch `git checkout -b e24.1`
4. Make changes for the assignment

## After Pull Request Is Approved
1. Checkout main and pull merged changes
2. Delete branch `git branch -d e24.1`
