/*
 * @Description: 
 * @Version: 2.0
 * @Autor: 刘林
 * @Date: 2020-03-12 17:26:34
 * @LastEditors: 刘林
 * @LastEditTime: 2020-12-23 20:35:51
 */

const reactRoutes = ['react/react-source1', 'react/react-source2',
  'react/react-source3', 'react/react-source4', 'react/webpack4-react'];

const cssRoutes = ['css/css3-card'];

module.exports = {
  docs: {
    JS: [
      'js/doc1',
      {
        type: 'category',
        label: 'JavaScript设计模式',
        items: [
          'js/javascript-design-patterns/js-javascript-design-patterns-2-2',
          'js/javascript-design-patterns/js-javascript-design-patterns-2-3',
          'js/javascript-design-patterns/js-javascript-design-patterns-2-4',
          'js/javascript-design-patterns/js-javascript-design-patterns-3-1',
          'js/javascript-design-patterns/js-javascript-design-patterns-3-2',
          'js/javascript-design-patterns/js-javascript-design-patterns-3-3',
          'js/javascript-design-patterns/js-javascript-design-patterns-3-4',
          'js/javascript-design-patterns/js-javascript-design-patterns-3-5',
        ],
      },
    ],
    React: reactRoutes,
    CSS: cssRoutes,
    Flutter: ['doc3'],
  },
};
