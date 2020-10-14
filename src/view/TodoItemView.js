import { element } from "./html-util.js"

export class TodoItemView{

    /**
     *TodoItemに対応するTodoアイテムのHTML要素を作成して返す
     *
     * @param {TodoItemModel} todoItem
     * @param {function({id: string, completed: boolean})} onUpdateTodo
     * チェックボックスの更新イベントリスナー
     * @param {function({id: string})} onDeleteTodo
     * 削除ボタンクリックのイベントリスナー
     * 
     * @returns {Element}
     * 
     */
    createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
        //完了済みならchecked付与、未完了ならchecked外す
        const todoItemElement = todoItem.completed
                ? element`<li><input type="checkbox" class="checkbox" checked><s>${todoItem.title}</s><button class="delete">×</button></li>`
                : element`<li><input type="checkbox" class="checkbox">${todoItem.title}<button class="delete">×</button></li>`;
                
        //チェックボックスがトグル(change)したときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox"); 
        inputCheckboxElement.addEventListener('change', () => {
            onUpdateTodo({
                id: todoItem.id,
                completed: !todoItem.completed
            });
        });

        //削除ボタンがクリックされたときにTodoListModelからアイテムを削除
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener('click', () => {
            onDeleteTodo({
                id: todoItem.id
            });
        });

        return todoItemElement;


    }
}