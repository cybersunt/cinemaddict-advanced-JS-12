import Observer from "../utils/observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  set(comments) {
    this._comments = comments.slice();
  }

  get() {
    return this._comments;
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: comment.date !== null ? new Date(comment.date) : comment.date
        }
    );
    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          date: comment.date instanceof Date ? comment.date.toISOString() : null
        }
    );
    delete adaptedComment.id;
    delete adaptedComment.author;
    return adaptedComment;
  }
}
