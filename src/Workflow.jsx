import React from 'react';
import {
	DiagramWidget,
	DiagramEngine,
	DefaultNodeFactory,
	DefaultLinkFactory,
	DiagramModel,
	DefaultNodeModel,
	DefaultPortModel,
	LinkModel
} from 'storm-react-diagrams';

import './srd.css';

class Workflow extends React.Component {
	componentWillMount() {
		this.engine = new DiagramEngine();

		this.engine.registerNodeFactory(new DefaultNodeFactory());
		this.engine.registerLinkFactory(new DefaultLinkFactory());

		const model = new DiagramModel();

		const node1 = new DefaultNodeModel('IN', 'rgb(0,192,255)');
		const port1a = node1.addPort(new DefaultPortModel(false, 'in-1a', 'Input 1a'));
		const port1b = node1.addPort(new DefaultPortModel(false, 'in-1b', 'Input 1b'));
		node1.x = 100;
		node1.y = 100;

		const node2 = new DefaultNodeModel('IN', 'rgb(0,192,255)');
		const port2 = node2.addPort(new DefaultPortModel(false, 'in-2', 'Input 2'));
		node2.x = 100;
		node2.y = 200;
		
		const node3 = new DefaultNodeModel('IN', 'rgb(0,192,255)');
		const port3 = node3.addPort(new DefaultPortModel(false, 'in-2.1', 'Input 2.1'));
		node3.x = 300;
		node3.y = 200;

		const node4 = new DefaultNodeModel('OUT', 'rgb(192,255,0)');
		const port4 = node4.addPort(new DefaultPortModel(true, 'out', 'Output'));
		node4.x = 500;
		node4.y = 100;

		const link1a = new LinkModel();
		link1a.setSourcePort(port1a);
		link1a.setTargetPort(port4);
		
		const link1b = new LinkModel();
		link1b.setSourcePort(port1b);
		link1b.setTargetPort(port3);
		
		const link2 = new LinkModel();
		link2.setSourcePort(port2);
		link2.setTargetPort(port3);

		const link3 = new LinkModel();
		link3.setSourcePort(port3);
		link3.setTargetPort(port4);

		model.addNode(node1);
		model.addNode(node2);
		model.addNode(node3);
		model.addNode(node4);

		model.addLink(link1a);
		model.addLink(link1b);
		model.addLink(link2);
		model.addLink(link3);
		
		this.engine.setDiagramModel(model);
	}
	render() {
		return (
			<div>
				<DiagramWidget diagramEngine={this.engine} />
			</div>
		);
	}
}

export default Workflow;