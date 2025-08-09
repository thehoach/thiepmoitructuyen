// src/utils/templateRegistry.js
const configModules = import.meta.glob("../templates/*/config.js", { eager: true });
const componentModules = import.meta.glob("../templates/*/*.jsx"); // lazy load

const registry = {};

for (const path in configModules) {
  const match = path.match(/..\/templates\/([^/]+)\/config\.js$/);
  if (match) {
    const templateId = match[1];
    registry[templateId] = {
      config: configModules[path].default,
      component: componentModules[`../templates/${templateId}/${templateId.charAt(0).toUpperCase() + templateId.slice(1)}Card.jsx`]
    };
  }
}

export default registry;
