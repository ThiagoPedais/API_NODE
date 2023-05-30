import handlebars from 'handlebars';

interface TemplateVariable {
  [key: string]: string | number;
}

interface ParseMailTemplate {
  template: string;
  variables: TemplateVariable;
}

export default class HandlebarsMailTemplate {
  public async parse({
    template,
    variables,
  }: ParseMailTemplate): Promise<string> {
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
