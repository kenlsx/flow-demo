import React from "react";
import { Graph } from "@antv/x6";
// import { MiniMap } from "@antv/x6-plugin-minimap";
import "./Editor.css";

// 自定义连接桩
Graph.registerNode(
  "custom-node-width-port",
  {
    inherit: "rect",
    width: 100,
    height: 40,
    attrs: {
      image: {
        event: "node:delete",
        xlinkHref: "trash.png",
        width: 20,
        height: 20,
      },
      body: {
        stroke: "#8f8f8f",
        strokeWidth: 1,
        fill: "#fff",
        rx: 6,
        ry: 6,
      },
    },
    ports: {
      groups: {
        top: {
          position: "top",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 4,
            },
          },
        },
        bottom: {
          position: "bottom",
          attrs: {
            circle: {
              magnet: true,
              stroke: "#8f8f8f",
              r: 4,
            },
          },
        },
      },
    },
  },
  true
);

export default class Example extends React.Component {
  container;
  graph;

  componentDidMount() {
    this.graph = new Graph({
      container: this.container,
      // 设置画布背景颜色
      background: {
        color: "#F2F7FA",
      },
      // 连线配置
      connecting: {
        allowBlank: false, //是否允许连接到画布空白位置的点，默认为 true。
        allowLoop: false, //是否允许创建循环连线，即边的起始节点和终止节点为同一节点，默认为 true。
        allowNode: false, //是否允许边连接到节点（非节点上的连接桩），默认为 true。
        allowEdge: false, //是否允许边连接到另一个边，默认为 true。
        allowPort: true, //是否允许边连接到连接桩，默认为 true。
        allowMulti: true, //是否允许在相同的起始节点和终止之间创建多条边，默认为 true。
        connector: "smooth",
      },
      panning: true,
      mousewheel: true,
      grid: {
        visible: true,
        type: "doubleMesh",
        args: [
          {
            color: "#eee", // 主网格线颜色
            thickness: 1, // 主网格线宽度
          },
          {
            color: "#ddd", // 次网格线颜色
            thickness: 1, // 次网格线宽度
            factor: 4, // 主次网格线间隔
          },
        ],
      },
      // 连接点高亮配置
      highlighting: {
        // 连接桩可以被连接时在连接桩外围围渲染一个包围框
        magnetAvailable: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#A4DEB1",
              strokeWidth: 6,
            },
          },
        },
        // 连接桩吸附连线时在连接桩外围围渲染一个包围框
        magnetAdsorbed: {
          name: "stroke",
          args: {
            attrs: {
              fill: "#fff",
              stroke: "#31d0c6",
              strokeWidth: 6,
            },
          },
        },
      },
    });

    // this.graph.fromJSON(data); // 渲染元素
    this.graph.centerContent(); // 居中显示

    // this.graph.use(
    //   new MiniMap({
    //     container: document.getElementById("minimap"),
    //     width: 200,
    //     height: 120,
    //   })
    // );
  }

  refContainer = (container) => {
    this.container = container;
  };

  zoom = (count) => {
    this.graph.zoom(count);
  };

  click = () => {
    console.log(this.graph.get);
  };

  add = () => {
    this.graph.addNode({
      shape: "custom-node-width-port",
      x: 500 * Math.random(),
      y: -100 * Math.random(),
      width: 100,
      height: 40,
      label: `新数据表${(Math.random() * 100).toFixed(0)}`,
      ports: {
        items: [
          {
            id: "port_1",
            group: "bottom",
          },
          {
            id: "port_2",
            group: "top",
          },
        ],
      },
    });
  };

  render() {
    return (
      <div className="cont">
        <div className="left">
          <button type="button" onClick={() => this.zoom(0.2)}>
            放大
          </button>
          <button type="button" onClick={() => this.zoom(-0.2)}>
            缩小
          </button>
        </div>
        <div className="page">
          <div className="helloworld-app">
            <div className="app-content" ref={this.refContainer} />
          </div>
        </div>
        <div className="right">
          <button type="button" onClick={this.click}>
            修改label
          </button>
          <button type="button" onClick={this.add}>
            添加节点
          </button>

          <div id="minimap"></div>
        </div>
      </div>
    );
  }
}
