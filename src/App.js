import { Tabs } from "antd";
import G6Editor from "./G6Editor";
import X6Editor from "./X6Editor";

function App() {
  const items = [
    {
      key: "1",
      label: "G6-Editor",
      children: <G6Editor />,
    },
    {
      key: "2",
      label: "X6",
      children: <X6Editor />,
    },
    {
      key: "3",
      label: "G6",
      children: "Content of Tab Pane 3",
    },
  ];

  return (
    <div style={{ padding: 50 }}>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default App;
