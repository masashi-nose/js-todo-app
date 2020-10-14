//ユニークなIDを管理する変数
let todoIdx = 0;

export class TodoItemModel{
    constructor({ title, completed }) {
        //idは自動で連番処理され、インスタンスごとに異なるものとする
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }
}
