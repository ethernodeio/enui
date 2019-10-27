import React, { useEffect, useState } from "react";
import { useUsername } from "../stores/useCredsStore";
import { useNode } from "../stores/useNodesStore";
import { useToken } from "../stores/useTokenStore";
import { enAPIhttp } from "../api/EnApi";
import { NavigationBar } from "../components/navigationComponent";
import NodeList from "../components/nodeComponents";
import NodeModal from "./NodeModal";
import useInterval from "use-interval";
import useStyles from "../theme";

interface IProps {
  history: any;
}

const NodesPage: React.FC<IProps> = (props) => {
  const [username] = useUsername();
  const [nodes, setNodes] = useNode();
  const [token] = useToken();
  const [result, setResult] = useState();
  const classes = useStyles();

  const getNodes = () => {
    enAPIhttp.getUser(token, username).then((userInfoResult) => {
      setNodes(userInfoResult.nodes);
      nodes.map((node: any, index: any) => {
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "web3_clientVersion", [], 67).then((clientVersionResult) => {
          node.clientversion = clientVersionResult.result;
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_chainId", [], 67).then((chainIdResult) => {
          node.chainid = chainIdResult.result;
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "net_version", [], 60).then((versionResult) => {
          node.version = versionResult.result;
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "net_peerCount", [], 67).then((netPeerCountResult) => {
          node.peers = netPeerCountResult.result;
        });
        enAPIhttp.getNodeContainerInfo(token, node.nodeId).then((conatinerInfoResult) => {
          node.rpcPort = conatinerInfoResult.rpcPort;
          node.wsPort = conatinerInfoResult.wsPort;
        });
        enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_syncing", [], 61).then((syncResult) => {
          if (syncResult.result !== false) {
            node.sync = syncResult.result;
            setNodes(nodes);
          } else {
            node.sync = "false";
            enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_blockNumber", [], 62).then((blockNumberResult) => {
              node.blockNumber = blockNumberResult.result;
              enAPIhttp.ethRpcCall(username, node.nodeName, node.nodeNetwork, "eth_getBlockByNumber", [blockNumberResult.result, true], 63).then((getBlockByNumResult) => {
                node.blockinfo = getBlockByNumResult.result;
                setNodes(nodes);
              });
            });
          }
        });
        return nodes;
      });
    });
  };

  async function addNode(nodeName: string, nodeNetwork: string, syncType: string, enableRpc: boolean, enableWS: boolean) {
    const addNodeResult = await enAPIhttp.addNode(token, username, nodeName, nodeNetwork, syncType, enableRpc, enableWS);
    if (addNodeResult && addNodeResult.status === "success") {
      const getUserInfo = await enAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);
    } else {
      setResult(addNodeResult.message);
    }
  }

  async function removeNodes(containerId: string, nodeName: string, removeData: boolean) {
    const removeNodeResult = await enAPIhttp.removeNode(token, username, containerId, nodeName, removeData);
    if (removeNodeResult && removeNodeResult.status === "success") {
      const getUserInfo = await enAPIhttp.getUser(token, username);
      setNodes(getUserInfo.nodes);

    } else {
      setResult(removeNodeResult.message);
    }
  }

  useEffect(() => {
    getNodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useInterval(() => {
    getNodes();
  }, 10000);

  return (
    <div className={classes.root} >
      <NavigationBar title={"Docker Nodes - " + username + " these are your nodes running in docker containers"} />
      {nodes ? <NodeList removeNodes={removeNodes} /> : < div > Loading Nodes</div>}
      <NodeModal addNode={addNode} getNodes={getNodes} />
      {result && <div>{result}</div>}
    </div>
  );
};
export default NodesPage;
