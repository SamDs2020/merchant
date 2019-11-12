import devConfig from "./environment/development.env";
import prodConfig from "./environment/production.env";

export default { ...(__DEV__ ? devConfig : prodConfig) };
