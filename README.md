# README
---
# DB設計

## group_userテーブル(中間テーブル)

| Column | Type       | Options                        |
| ------ | ---------- | ------------------------------ |
| group  | references | null: false, foreign_key: true |
| user   | references | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user



## usersテーブル

| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| nickname | string | null: false, uniqeu: true, index: true, |
| email    | string | null: false |
| password | string | null: false |

*devise

### Association

- has_many :group_users
- has_many :messages
- has_many :groups, through: :group_users


## groupsテーブル

| Column    | Type   | Options                                |
| --------- | ------ | -------------------------------------- |
| name      | string | null: false, unique: true, index: true |

### Association

- has_many :group_users
- has_many :messages
- has_many :users, through: :group_users


## messagesテーブル

| Column    | Type       | Options                        |
| --------- | ---------- | ------------------------------ |
| content   | text       |                                |
| image     | text       |                                |
| group     | references | null: false, foreign_key: true |
| user      | references | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user

---

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
