# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Event.destroy_all
Location.destroy_all
When.destroy_all

when1 = When.create(date: DateTime.new(2018, 12, 25))
when2 = When.create(date: DateTime.new(2018, 12, 23))
when3 = When.create(date: DateTime.new(2018, 12, 21))

loc1 = Location.create(city: "Boston", state: "MA", latitude: 42.3125, longitude: -70.9978)
loc2 = Location.create(city: "Des Moines", state: "IA", latitude: 41.575, longitude: -93.6038)
loc3 = Location.create(city: "Seattle", state: "WA", latitude: 47.6062, longitude: -122.3321)
loc4 = Location.create(city: "Philadelphia", state: "PA", latitude: 39.9526, longitude: -75.1652)

Event.create(when_id: when1.id, location_id: loc1.id, title: "Christmas in Boston", info: "Lots of holiday spirit!", img_url: "https://i.ndtvimg.com/i/2015-12/christmas_650x400_71450865126.jpg")
Event.create(when_id: when2.id, location_id: loc1.id, title: "Celtics Game", info: "Basketball sure is fun!", img_url: "https://cdn.vox-cdn.com/thumbor/5w4KZ71ZASzPehmoxsv7uxovgVk=/0x0:5184x3456/1200x800/filters:focal(3433x656:4261x1484)/cdn.vox-cdn.com/uploads/chorus_image/image/61852583/1039402776.jpg.0.jpg")
Event.create(when_id: when3.id, location_id: loc1.id, title: "Walked the Freedom Trail", info: "I learned about the founding fathers", img_url: "http://res.cloudinary.com/simpleview/image/upload/v1459385393/clients/boston/freedomtrail-medallion-massport-cl-11_e57a98c5-f0ae-5102-046b682397fbe73d.jpg")
Event.create(when_id: when2.id, location_id: loc2.id, title: "Butter Sculpture Festival", info: "Butter is delicious!", img_url: "https://cdn0.wideopeneats.com/wp-content/uploads/2017/09/butter-sculptures-fi.png")
Event.create(when_id: when2.id, location_id: loc3.id, title: "Climbed the Space Needle", info: "It's very tall", img_url: "http://deacademic.com/pictures/dewiki/83/SpaceNeedleTopClose.jpg")
Event.create(when_id: when3.id, location_id: loc4.id, title: "Cracked the Liberty Bell", info: "Yikes.", img_url: "http://www.ushistory.org/libertybell/images/bell3.jpg")
