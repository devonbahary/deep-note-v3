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
        CREATE TABLE  folders (
            uuid_bin BINARY(16) NOT NULL PRIMARY KEY,
            uuid VARCHAR(36) GENERATED ALWAYS AS 
            (
                insert(
                    insert(
                        insert(
                            insert(hex(uuid_bin),9,0,'-'),
                        14,0,'-'),
                    19,0,'-'),
                24,0,'-')
            ) virtual,
            name VARCHAR(255) NOT NULL DEFAULT '',
            parent_folder_uuid_bin BINARY(16),
            CONSTRAINT fk_parent_folder_uuid_bin 
            FOREIGN KEY (parent_folder_uuid_bin) REFERENCES folders (uuid_bin)
            ON DELETE CASCADE,
            parent_folder_uuid VARCHAR(36) GENERATED ALWAYS AS 
            (
                insert(
                    insert(
                        insert(
                            insert(hex(parent_folder_uuid_bin),9,0,'-'),
                        14,0,'-'),
                    19,0,'-'),
                24,0,'-')
            ) virtual,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        );
    `, callback);
};

exports.down = function(db) {
    return db.dropTable('folders');
};

exports._meta = {
  "version": 1
};
