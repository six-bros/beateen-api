/**
 * Loopback에서 관계 설정시 자동으로 생성되는 remote-method 제거
 **/
const hilde = {};


hilde.relationRemoteMethod = function (model) {
  if (model && model.sharedClass) {
    const methodsToExpose = [];
    // const modelName = model.sharedClass.name;
    const methods = model.sharedClass.methods();
    const relationMethods = [];
    const hiddenMethods = [];
    try {
      Object.keys(model.definition.settings.relations).forEach(function (relation) {
        relationMethods.push({name: '__findById__' + relation, isStatic: false});
        relationMethods.push({name: '__destroyById__' + relation, isStatic: false});
        relationMethods.push({name: '__updateById__' + relation, isStatic: false});
        relationMethods.push({name: '__exists__' + relation, isStatic: false});
        relationMethods.push({name: '__link__' + relation, isStatic: false});
        relationMethods.push({name: '__get__' + relation, isStatic: false});
        relationMethods.push({name: '__create__' + relation, isStatic: false});
        relationMethods.push({name: '__update__' + relation, isStatic: false});
        relationMethods.push({name: '__destroy__' + relation, isStatic: false});
        relationMethods.push({name: '__unlink__' + relation, isStatic: false});
        relationMethods.push({name: '__count__' + relation, isStatic: false});
        relationMethods.push({name: '__delete__' + relation, isStatic: false});
      });
    } catch (err) {
      throw err;
    }
    methods.concat(relationMethods).forEach(function (method) {
      const methodName = method.name;
      if (methodsToExpose.indexOf(methodName) < 0) {
        hiddenMethods.push(methodName);
        model.disableRemoteMethod(methodName, method.isStatic);
      }
    });
  }
};


module.exports = hilde;