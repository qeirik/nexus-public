/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Open Source Version is distributed with Sencha Ext JS pursuant to a FLOSS Exception agreed upon
 * between Sonatype, Inc. and Sencha Inc. Sencha Ext JS is licensed under GPL v3 and cannot be redistributed as part of a
 * closed source work.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
/*global Ext, NX*/

/**
 * Add LDAP connection window.
 *
 * @since 3.0
 */
Ext.define('NX.coreui.view.ldap.LdapServerConnectionAdd', {
  extend: 'NX.view.AddPanel',
  alias: 'widget.nx-coreui-ldapserver-connection-add',
  requires: [
    'NX.Conditions',
    'NX.I18n'
  ],

  dockedItems: null,

  /**
   * @override
   */
  initComponent: function () {
    var me = this;

    me.settingsForm = {
      xtype: 'nx-coreui-ldapserver-connection-form',
      isAddPage: true,

      editableCondition: NX.Conditions.isPermitted('nexus:ldap:create'),
      editableMarker: NX.I18n.get('Ldap_LdapServerConnectionAdd_Create_Error'),

      buttons: [
        { text: NX.I18n.get('Ldap_LdapServerConnectionAdd_Text'), action: 'next', ui: 'nx-primary' },
        { text: NX.I18n.get('Add_Cancel_Button'), action: 'back' }
      ]
    };

    me.callParent();

    NX.Conditions.formIs(me.down('form'), function(form) {
      return !form.isDisabled() && form.isValid();
    }).on({
      satisfied: function() {
        this.enable();
      },
      unsatisfied: function() {
        this.disable();
      },
      scope: me.down('button[action=next]')
    });
  }
});
