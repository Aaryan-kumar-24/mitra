import React, { useEffect, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";

function FlowInner({ data }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { zoomIn, zoomOut, fitView, setViewport, getViewport } = useReactFlow();

  const VERTICAL_GAP = 160;
  const HORIZONTAL_GAP = 260;
  const START_X = 50;

  const expandedNodesRef = useRef(new Set());

  // 🔥 INITIAL LOAD
  const initializeGraph = () => {
    if (!data || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) return;

    const baseNodes = data.nodes.map((node, i) => ({
      id: node.id,
      data: {
        label: node.title,
        level: 0,
        parent: null,
        isLeaf: false,
      },
      position: {
        x: START_X,
        y: i * VERTICAL_GAP + 50,
      },
      style: {
        padding: 12,
        borderRadius: 10,
        background: "#6366f1",
        color: "white",
        width: 200,
        textAlign: "center",
        cursor: "pointer",
      },
    }));

    const baseEdges = data.edges.map((edge) => ({
      id: `${edge.source}-${edge.target}`,
      source: edge.source,
      target: edge.target,
      animated: true,
    }));

    setNodes(baseNodes);
    setEdges(baseEdges);
    expandedNodesRef.current.clear();

    // ✅ ONLY here we use fitView
    setTimeout(() => fitView({ padding: 0.2 }), 100);
  };

  useEffect(() => {
    initializeGraph();
  }, [data]);

  // 🔥 REMOVE DESCENDANTS
  const removeDescendants = (nodeId) => {
    setNodes((nds) => {
      const toRemove = new Set();

      const findChildren = (id) => {
        nds.forEach((n) => {
          if (n.data.parent === id) {
            toRemove.add(n.id);
            findChildren(n.id);
          }
        });
      };

      findChildren(nodeId);
      return nds.filter((n) => !toRemove.has(n.id));
    });

    setEdges((eds) =>
      eds.filter(
        (e) =>
          !e.source.startsWith(nodeId + "-child") &&
          !e.target.startsWith(nodeId + "-child")
      )
    );

    expandedNodesRef.current.delete(nodeId);
  };

  // 🔥 CLICK HANDLER (NO ZOOM RESET)
  const onNodeClick = useCallback(async (event, node) => {
    try {
      // ✅ SAVE CURRENT VIEWPORT
      const currentViewport = getViewport();

      if (expandedNodesRef.current.has(node.id)) {
        removeDescendants(node.id);

        // ✅ RESTORE VIEWPORT
        setViewport(currentViewport);
        return;
      }

      const res = await fetch(
        `http://localhost:8001/generate_topic?topic=${node.data.label}`
      );

      const topicData = await res.json();
      const subtopics = topicData?.subtopics || [];

      if (!subtopics.length) return;

      const childNodes = subtopics.map((sub, i) => ({
        id: `${node.id}-child-${i}`,
        data: {
          label: sub,
          level: node.data.level + 1,
          parent: node.id,
          isLeaf: false,
        },
        position: {
          x: START_X + (node.data.level + 1) * HORIZONTAL_GAP,
          y: node.position.y + i * VERTICAL_GAP,
        },
        style: {
          padding: 10,
          borderRadius: 10,
          background: "#10b981",
          color: "white",
          width: 200,
          textAlign: "center",
          cursor: "pointer",
        },
      }));

      const childEdges = subtopics.map((_, i) => ({
        id: `${node.id}-child-edge-${i}`,
        source: node.id,
        target: `${node.id}-child-${i}`,
        animated: true,
      }));

      setNodes((nds) => [...nds, ...childNodes]);
      setEdges((eds) => [...eds, ...childEdges]);

      expandedNodesRef.current.add(node.id);

      // ✅ RESTORE SAME ZOOM + POSITION
      setTimeout(() => {
        setViewport(currentViewport);
      }, 50);

    } catch (err) {
      console.error(err);
    }
  }, [getViewport, setViewport]);

  return (
    <div className="relative w-[900px] h-[700px] bg-white border rounded-xl shadow-lg overflow-hidden">

      {/* 🔥 CONTROLS */}
      <div className="absolute top-3 right-3 z-10 flex gap-2">

        <button
          onClick={() => zoomIn({ duration: 300 })}
          className="bg-white border px-3 py-1 rounded shadow hover:bg-gray-100"
        >
          ➕
        </button>

        <button
          onClick={() => zoomOut({ duration: 300 })}
          className="bg-white border px-3 py-1 rounded shadow hover:bg-gray-100"
        >
          ➖
        </button>

        {/* 🔄 REFRESH */}
        <button
          onClick={() => {
            initializeGraph();
            setViewport({ x: 0, y: 0, zoom: 1 });
          }}
          className="bg-white border px-3 py-1 rounded shadow hover:bg-gray-100"
        >
          🔄
        </button>

      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}

        fitView
        fitViewOptions={{ padding: 0.2 }}

        panOnDrag={true}
        zoomOnScroll={false}

        translateExtent={[
          [-100, -100],
          [2000, 2000],
        ]}

        style={{ cursor: "grab" }}
      />
    </div>
  );
}


// 🔥 WRAPPER
function RoadmapGraph({ data }) {
  return (
    <div className="w-full flex justify-center bg-white py-10">
      <ReactFlowProvider>
        <FlowInner data={data} />
      </ReactFlowProvider>
    </div>
  );
}

export default RoadmapGraph;