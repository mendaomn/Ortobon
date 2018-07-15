import DOMHelpers from './libs/dom-helpers';
import StateManager from './libs/state-manager';

import NewCommentSectionController from './controllers/new-comment-section-controller';
import CommentsListController from './controllers/comments-list-controller';
import CommentController from './controllers/comment-controller';
import ButtonController from './controllers/button-controller';
import DeleteButtonController from './controllers/delete-button-controller';
import FbButtonController from './controllers/fb-button-controller';

const initialState = {
  commentContent: '',
  isButtonActive: false,
  newComment: ''
}

const newCommentSection = new NewCommentSectionController();
const commentsList = new CommentsListController();
const comment = new CommentController();
const button = new ButtonController();
const deleteBtn = new DeleteButtonController();
const loginBtn = new FbButtonController();

StateManager.subscribe( onStateUpdate );
StateManager.setState( initialState );

function onStateUpdate( state ) {
  button.update();
  comment.update();
  newCommentSection.update();
  commentsList.update();
}
