
//JSON Settings Merge

function mergeSettings(savedSettingsJSON, defaultSettings) {

  //  Convert JSON string to object
  const savedSettings = JSON.parse(savedSettingsJSON);

  //  Merge objects
  const merged = { ...defaultSettings, ...savedSettings };

  // Return both object and JSON string
  return {
    mergedObject: merged,
    mergedJSON: JSON.stringify(merged)
  };
}


// default 
const defaultSettings = {
  theme: "light",
  fontSize: 14,
  notifications: true
};

const savedSettingsJSON = '{"theme":"dark","notifications":false}';

const result = mergeSettings(savedSettingsJSON, defaultSettings);

console.log(result);