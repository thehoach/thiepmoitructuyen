// src/utils/templateRegistry.js

// Dynamically import all config.js files under src/templates/*/
const configModules = import.meta.glob("../templates/*/config.js", { eager: true });
const componentModules = import.meta.glob("../templates/*/*.jsx");

// Build the registry object
const templateRegistry = {};

for (const path in configModules) {
  // Extract template id from path, e.g. "../templates/classic/config.js" -> "classic"
  const match = path.match(/\/templates\/([^/]+)\/config\.js$/);
  if (!match) continue;

  const templateId = match[1];
  const config = configModules[path].default;

  // Find corresponding component file dynamically: e.g. "../templates/classic/ClassicCard.jsx"
  // Assume component filename matches config folder name + 'Card.jsx'
  const componentPath = `../templates/${templateId}/${templateId.charAt(0).toUpperCase() + templateId.slice(1)}Card.jsx`;

  templateRegistry[templateId] = {
    ...config,
    component: () => componentModules[componentPath](),
  };
}

export default templateRegistry;
