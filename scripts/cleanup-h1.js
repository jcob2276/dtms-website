const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const appPath = 'c:/Users/jakub/Desktop/stronadtms/app';
const files = walk(appPath);
files.forEach((file) => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  // Remove <h1 className="sr-only">...</h1> but only if it's not the only content
  // Actually, we want to remove all hidden H1s because we now have visible ones in Hero or Page Title
  content = content.replace(/<h1 className="sr-only">.*?<\/h1>\s*/g, '');
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Cleaned: ${file}`);
  }
});
