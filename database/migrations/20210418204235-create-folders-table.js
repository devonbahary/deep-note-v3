'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
    return db.runSql(`
        CREATE TABLE folders (
            uuid_bin binary(16) NOT NULL,
            uuid varchar(36) GENERATED ALWAYS AS (insert(insert(insert(insert(hex(uuid_bin),9,0,'-'),14,0,'-'),19,0,'-'),24,0,'-')) VIRTUAL,
            name varchar(255) NOT NULL DEFAULT '',
            parent_folder_uuid_bin binary(16) DEFAULT NULL,
            parent_folder_uuid varchar(36) GENERATED ALWAYS AS (insert(insert(insert(insert(hex(parent_folder_uuid_bin),9,0,'-'),14,0,'-'),19,0,'-'),24,0,'-')) VIRTUAL,
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (uuid_bin),
            KEY fk_parent_folder_uuid_bin (parent_folder_uuid_bin),
            CONSTRAINT fk_parent_folder_uuid_bin FOREIGN KEY (parent_folder_uuid_bin) REFERENCES folders (uuid_bin) ON DELETE CASCADE
        )
    `, callback);
};

exports.down = function(db) {
    return db.dropTable('folders');
};

exports._meta = {
  "version": 1
};
