# README
---
# DB設計

## membersテーブル

| Column | Type      | Options                        |
| ------ | --------- | ------------------------------ |
| user   | reference | null: false, foreign_key: true |
| group  | reference | null: false, foreign_key: true |

### Association

- belongs_to :group
- belongs_to :user



## usersテーブル

| Column   | Type   | Options     |
| -------- | ------ | ----------- |
| nickname | text   | null: false |
| email    | string | null: false |
| password | string | null: false |

### Association

- has_many :members
- has_many :messages



## groupsテーブル

| Column    | Type | Options     |
| --------- | ---- | ----------- |
| name      | text | null: false |

### Association

- has_many :members
- has_many :messages



## messagesテーブル

| Column | Type      | Options                        |
| ------ | --------- | ------------------------------ |
| body   | text      |                                |
| image  | text      |                                |
| group  | reference | null: false, foreign_key: true |
| user   | reference | null: false, foreign_key: true |

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
