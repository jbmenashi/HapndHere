class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.references :location, foreign_key: true
      t.references :when, foreign_key: true
      t.string :title
      t.string :info
      t.string :img_url

      t.timestamps
    end
  end
end
