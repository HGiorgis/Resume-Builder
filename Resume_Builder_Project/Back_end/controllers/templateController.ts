import Template from "./../models/templateModel";
import * as handler from "./factoryHandler";

export const getTemplates = handler.getAll(Template);
export const getTemplate = handler.getOne(Template);
