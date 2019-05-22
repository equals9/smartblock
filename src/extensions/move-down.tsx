import * as React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/fontawesome-free-solid'
import { setTextSelection, findChildren } from 'prosemirror-utils';
import { Extension } from '../types';
import { findNodePosition } from '../utils';

export default class MoveDown implements Extension {
  get name() {
    return 'move-down';
  }
  get showMenu() {
    return true;
  }
  get schema() {
    return {
      group: 'block'
    }
  }
  get icon() {
    return <FontAwesomeIcon icon={faArrowDown} />
  }
  onClick (_state, _dispatch, view) {
    const { state } = view;
    const { selection } = state;
    const { $anchor } = selection;
    const resolvedPos = state.doc.resolve($anchor.pos) as any;
    const rowNumber = resolvedPos.path[1];
    let i = 0;
    const [ firstNode, secondNode ] = findChildren(state.doc, (_node) => {
      if (rowNumber === i || rowNumber + 1 === i) {
        i++;
        return true;
      }
      i++;
      return false;
    }, false);
    if (secondNode) {
      const firstIndex = firstNode.pos;
      const secondIndex = secondNode.pos;
      const removeTransaction = state.tr.delete(firstIndex, secondIndex);
      view.dispatch(removeTransaction);
      const firstNode2 = removeTransaction.doc.content.child(rowNumber);
      const firstIndex2 = findNodePosition(removeTransaction.doc, firstNode2);
      const insertTransaction = view.state.tr.insert(firstIndex2 + firstNode2.nodeSize, firstNode.node);
      view.dispatch(insertTransaction);
      view.dispatch(setTextSelection(firstIndex2 + firstNode2.nodeSize)(view.state.tr));
      view.state.tr.scrollIntoView();
    }
  }
}