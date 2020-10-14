import { EventEmitter } from '../EventEmitter.js'
import { TodoItemModel } from './TodoItemModel.js';

export class TodoListModel extends EventEmitter{
    /**
     *
     * @param {TodoItemModel} [items] 初期アイテム一覧（デフォルトは空の引数)
     */
    constructor(items = []) {
        super();
        this.items = items;
    }

    /**
     *TodoItemの合計個数を返す
     *
     * @return {number} 
     */
    getTotalCount() {
        return this.items.length;

    }

    /**
     *表示できるTodoItemの配列を返す
     *
     * @return {TodoItemModel[]} 
     */
    getTodoItems() {
        return this.items;
    }

    /**
     *TodoListの状態が更新された時に呼び出されるリスナー関数を登録する
     *
     * @param {Function} listner
     */
    onChange(listner) {
        this.addEventListner('change', listner);
    }

    /**
     *TodoListの状態が更新された時に呼び出されるリスナー関数を解除する
     *
     * @param {Function} listner
     */
    offChange(listner) {
        this.removeEventListner("change", listner);
    }

    /**
     *状態が変更された時に呼ぶ。登録済みのリスナー関数を呼び出す
     *
     * @memberof TodoListModel
     */
    emitChange() {
        this.emit('change');
    }

    /**
     *TodoListにアイテム追加
     *
     * @param {TodoItemModel} todoItem Todoアイテム
     * @memberof TodoListModel
     */
    addTodo(todoItem) {
        this.items.push(todoItem);
        this.emitChange();
    }

    /**
     *指定IDのTodoアイテムを削除します
     *
     * @param {TodoItemModel} { id, completed }
     */
    updateTodo({ id, completed }) {
        const todoItem = this.items.find(todo => todo.id === id);
        if (!todoItem) {
            return;
        }
        todoItem.completed = completed;
        this.emitChange();
    }

    /**
     *指定IDのTodoアイテムを削除
     *
     * @param {number} { id }
     */
    deleteTodo({ id }) {
        if (confirm("このTodoアイテムを削除します。")) {
            //idに一致しないTodoItemだけを残すことで、idに一致するTodoItemを削除する
            this.items = this.items.filter(todo => {
                return todo.id !== id;
            });
            this.emitChange(); 
        } else {
            return;
        }
    }


}