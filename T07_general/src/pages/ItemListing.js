import React from 'react';
import '../css/ItemListing.css';

const ItemListing = () => {
  return (
    <div className="h-screen flex flex-col justify-between bg-white">
      {/* Top navigation */}
      <div className="flex items-center justify-start p-4 border-b">
        <button className="mr-4">
          <span className="material-icons">arrow_back</span>
        </button>
        <h1 className="text-lg font-semibold">出品</h1>
      </div>

      {/* Main content */}
      <div className="flex-grow p-4 space-y-4">
        {/* Input for item name */}
        <input
          type="text"
          placeholder="この出品物の名前を入力してください"
          className="w-full p-3 border rounded-lg"
        />

        {/* Textarea for item description */}
        <textarea
          placeholder="買い手の方々へこの物品を紹介してください"
          rows="4"
          className="w-full p-3 border rounded-lg"
        ></textarea>

        {/* Image upload button */}
        <div className="w-full p-3 border rounded-lg flex items-center justify-center text-gray-500">
          <span className="material-icons mr-2">image</span>
          画像を追加してください
        </div>

        {/* Select transaction methods */}
        <div>
          <label className="block mb-2 text-gray-700">
            希望取引方法を選んでください(複数選択可)
          </label>
          <div className="flex space-x-2">
            <button className="flex-grow p-3 bg-green-100 text-green-600 rounded-lg">
              譲渡
            </button>
            <button className="flex-grow p-3 bg-blue-100 text-blue-600 rounded-lg">
              レンタル
            </button>
            <button className="flex-grow p-3 bg-orange-100 text-orange-600 rounded-lg">
              交換
            </button>
          </div>
        </div>

        {/* Input for optional location */}
        <input
          type="text"
          placeholder="受け渡し場所を入力してください(任意)"
          className="w-full p-3 border rounded-lg"
        />
      </div>

      {/* Confirm button */}
      <div className="p-4">
        <button className="w-full p-3 bg-blue-500 text-white rounded-lg">
          確認画面へ
        </button>
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-around bg-gray-100 p-2 border-t">
        <button className="text-gray-600">
          <span className="material-icons">home</span>
          ホーム
        </button>
        <button className="text-gray-600">
          <span className="material-icons">search</span>
          探す
        </button>
        <button className="text-gray-600">
          <span className="material-icons">add_box</span>
          出品
        </button>
        <button className="text-gray-600">
          <span className="material-icons">message</span>
          メッセージ
        </button>
        <button className="text-gray-600">
          <span className="material-icons">account_circle</span>
          マイページ
        </button>
      </div>
    </div>
  );
};

export default ItemListing;
