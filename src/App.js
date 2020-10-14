import { TodoListModel } from './model/TodoListModel.js'
import { TodoItemModel } from './model/TodoItemModel.js'
import { TodoListView } from "./view/TodoListView.js"
import { render } from "./view/html-util.js"

export class App{
    constructor({ formElement, formInputElement, todoListContainerElement, todoCountElement }) {
        console.log("container created");
        //1. TodoListの初期化
        this.todoListModel = new TodoListModel([]);
        this.todoListView = new TodoListView();

        //bind to Element
        this.formElement = formElement;
        console.log(this.formElement);
        this.formInputElement = formInputElement;
        console.log(this.formInputElement);
        this.todoListContainerElement = todoListContainerElement;
        console.log(todoListContainerElement);
        this.todoCountElement = todoCountElement;
        console.log(this.todoCountElement);

        //ハンドラ呼び出しでthisが変わらないように固定
        //thisが常にappのインスタンスを示すように固定
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     *Todo追加時に呼ばれるリスナー
     *
     * @param {string} title
     */
    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({
            title,
            completed: false
        }));
    }

    /**
     *Todo状態更新時に呼ばれるリスナー
     *
     * @param {{id: string, completed: boolean}} 
     */
    handleUpdate({id, completed}) {
        this.todoListModel.updateTodo({ id, completed });
    }

    /**
     *Todoを削除したときに呼ばれるリスナー関数
     *
     * @param {id:stirng} { id }
     */
    handleDelete({ id }) {
        this.todoListModel.deleteTodo({id});
    }

    /**
     *フォーム送信時に呼ばれるリスナー関数
     *
     * @param {Event} event
     */
    handleSubmit(event) {
        event.preventDefault();
        
        const inputElement = this.formInputElement;
        if (inputElement.value === "") {
            return;
        }

        this.handleAdd(inputElement.value);
        inputElement.value = "";
    }

    /**
     *TodoListViewが変更した時に呼ばれるリスナー関数
     *
     */
    handleChange() {
        console.log("handle change called");
        const todoCountElement = this.todoCountElement;
        console.log(todoCountElement)
        const todoListContainerElement = this.todoListContainerElement;
        console.log(todoListContainerElement);
        const todoItems = this.todoListModel.getTodoItems();
        console.log(todoItems);
        const todoListElement = this.todoListView.createElement(todoItems, {
            onUpdateTodo: ({ id, completed }) => {
                this.handleUpdate({ id, completed });
            },
            onDeleteTodo: ({ id }) => {
                this.handleDelete({ id });
            }
        });

        render(todoListElement, todoListContainerElement);
        todoCountElement.textContent = `Todoアイテム数：${this.todoListModel.getTotalCount()}`;

    }

    /**
     *アプリとDOMの紐づけを登録する
     */
    mount(){
        this.todoListModel.onChange(this.handleChange);
        this.formElement.addEventListener("submit", this.handleSubmit);
    }

    
    /**
     *アプリとDOMの紐づけを解除する
     *
     * @memberof App
     */
    unmount() {
        this.todoListModel.offChange(this.handleChange);
        this.formElement.removeEventListener("submit", this.handleSubmit);
        
    }
}