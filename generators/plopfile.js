module.exports = function (plop) {
  // controller generator
  plop.setGenerator('component', {
    description: 'Create component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/components/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/components/{{pascalCase name}}/styles.module.scss',
        templateFile: 'templates/components/styles.module.scss.hbs',
      },
    ],
  })

  plop.setGenerator('page', {
    description: 'Create page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'page name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{name}}/index.tsx',
        templateFile: 'templates/pages/index.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/pages/{{name}}/styles.module.scss',
        templateFile: 'templates/pages/styles.module.scss.hbs',
      },
    ],
  })
}
