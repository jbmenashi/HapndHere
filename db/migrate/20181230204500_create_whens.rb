class CreateWhens < ActiveRecord::Migration[5.2]
  def change
    create_table :whens do |t|
      t.datetime :date

      t.timestamps
    end
  end
end
