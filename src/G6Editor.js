import React, { useEffect, useState } from "react";
import G6Editor from "@antv/g6-editor";
import "./Editor.css";

function GEditor() {
  const [editor, setEditor] = useState(new G6Editor());
  useEffect(() => {
    init();
  }, []);

  function init() {
    const itempannel = new G6Editor.Itempannel({
      container: "itempannel",
    });
    const toolbar = new G6Editor.Toolbar({
      container: "toolbar",
    });
    const contextmenu = new G6Editor.Contextmenu({
      container: "contextmenu",
    });
    const page = new G6Editor.Flow({
      graph: {
        container: "page",
      },
    });

    const miniMap = new G6Editor.Minimap({
      container: "minimap",
      width: 200,
      height: 100,
    });
    editor.add(toolbar);
    // editor.add(miniMap);
    editor.add(contextmenu);
    editor.add(itempannel);
    editor.add(page);
  }

  function click() {
    const page = editor.getCurrentPage();
    console.log(page);
    page.update("456", {
      label: "测试修改文字",
    });
  }

  function add() {
    // 添加一个节点
    editor.getCurrentPage().add("node", {
      id: "node1", // id 必须唯一
      color: "#fff", // 颜色
      size: [100, 50], // 尺寸 || [宽, 高]
      shape: "rect", // 所用图形
      style: {
        // 关键形样式（优先级高于color）
        fill: "blue",
        stroke: "blue",
      },
      label: "文本标签" || {
        // 文本标签 || 文本图形配置
        text: "文本标签",
        fill: "#fffff",
      },
      parent: "group1", // 所属组
      index: 1, // 渲染层级
      x: 100,
      y: 100
    });
  }

  return (
    <div className="cont">
      <div>
        <div id="toolbar" style={{ marginBottom: 10 }}>
          <button
            type="button"
            data-command="delete"
            className="command"
            title="删除"
          >
            删除
          </button>
          <button
            type="button"
            data-command="zoomIn"
            className="command"
            title="放大"
          >
            放大
          </button>
          <button
            type="button"
            data-command="zoomOut"
            className="command"
            title="缩小"
          >
            缩小
          </button>
        </div>
        <div id="itempannel" className="itempannel">
          <div id="container">
            <button
              type="button"
              className="getItem"
              data-id="123"
              data-type="node"
              data-shape="circle"
              data-label="我是圆形"
            >
              圆形
            </button>
            <br />
            <button
              type="button"
              data-id="456"
              className="getItem"
              data-type="node"
              data-shape="rect"
              data-label="我是长方形"
              data-size="100*40"
            >
              长方形
            </button>
          </div>
        </div>
      </div>
      <div id="page" className="page">
        <div id="contextmenu" style={{ display: "none" }}>
          <div data-status="node-selected" className="menu">
            <button data-command="copy" className="command">
              复制
            </button>
            <button data-command="paste" className="command">
              粘贴
            </button>
            <button data-command="delete" className="command">
              删除
            </button>
          </div>
          <div data-status="edge-selected" className="menu">
            41
            <button data-command="delete" className="command">
              删除
            </button>
          </div>
          <div data-status="group-selected" className="menu">
            <button data-command="copy" className="command">
              复制
            </button>
            <button data-command="paste" className="command">
              粘贴
            </button>
            <button data-command="unGroup" className="command">
              解组
            </button>
            <button data-command="delete" className="command">
              删除
            </button>
          </div>
          <div data-status="canvas-selected" className="menu">
            <button data-command="undo" className="command">
              插销
            </button>
            <button data-command="redo" className="command disable">
              重做
            </button>
          </div>
          <div data-status="multi-selected" className="menu">
            <button data-command="copy" className="command">
              复制
            </button>
            <button data-command="paste" className="command">
              粘贴
            </button>
            <button data-command="addGroup" className="command">
              归组
            </button>
          </div>
        </div>
      </div>
      <div className="right">
        <button type="button" onClick={click}>
          修改label
        </button>
        <button type="button" onClick={add}>
          添加节点
        </button>

        <div id="minimap"></div>
      </div>
    </div>
  );
}

export default GEditor;
