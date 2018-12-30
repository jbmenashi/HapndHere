class CreateWhens < ActiveRecord::Migration[5.2]
  def change
    create_table :whens do |t|
      t.datetime :date_and_time

      t.timestamps
    end
  end
end
