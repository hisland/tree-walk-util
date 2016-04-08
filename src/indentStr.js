function indentStrToTree(str, indent_size = 2) {
  var reg = /^( *)(.*)$/gm;
  // 采用2维图的方式来处理
  var lvs = [
    []
  ];
  str = str.trim();

  function add(blank, text) {
    var lv = Math.ceil(blank / indent_size); // ceil, 尽可能认为是缩进
    var obj = {
      text: text
    }

    // 每次只缩进一层
    if (!lvs[lv]) {
      lvs.push([]);
      lv = lvs.length - 1;
    }

    if (lv > 0) {
      var lv_list = lvs[lv - 1];
      var parent = lv_list[lv_list.length - 1];
      if (parent.children) {
        parent.children.push(obj)
      } else {
        parent.children = [obj]
      }
      lvs[lv].push(obj);
    } else if (lv === 0) {
      lvs[lv].push(obj);
    }
  }

  str.replace(reg, function(match, blank, text) {
    add(blank.length, text)
  });

  return {
    children: lvs[0]
  };
}
export {
  indentStrToTree
};
