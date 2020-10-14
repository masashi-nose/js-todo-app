export class EventEmitter{
    constructor() {
        //登録する[イベント名, Set(リスナー関数)]を管理するMap
        this._listners = new Map();
    }

    /**
     *指定したイベントが実行された時に呼び出されるリスナー関数を登録
     *
     * @param {string} type イベント名
     * @param {Function} listner　イベントリスナー
     */
    addEventListner(type, listner) {
        //指定したイベントに対応するSetを作成し、リスナー関数を登録する
        if (!this._listners.has(type)) {
            this._listners.set(type, new Set());
        }

        const listnerSet = this._listners.get(type);
        listnerSet.add(listner);
    }

    /**
     *指定したイベントをディスパッチする
     *
     * @param {string} type イベント名
     */
    emit(type) {    
        //指定したイベントに対応するSetを取り出し、全てのリスナー関数を呼び出す
        const listnerSet = this._listners.get(type);
        if (!listnerSet) {
            return;
        }

        listnerSet.forEach(listner => {
            listner.call(this);
        });
        
    }

    removeEventListner(type, listner) {
        //指定したイベントに対応するSetを取り出し、該当するリスナー関数を削除する
        const listnerSet = this._listners.get(type);
        if (!listnerSet) {
            return;
        }
        listnerSet.forEach(ownListner => {
            if (ownListner === listner) {
                listnerSet.delete(listner);
            }
        });
    }
}