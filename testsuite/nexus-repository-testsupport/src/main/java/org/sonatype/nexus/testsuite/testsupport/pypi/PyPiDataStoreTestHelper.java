/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
package org.sonatype.nexus.testsuite.testsupport.pypi;

import javax.inject.Named;
import javax.inject.Singleton;

import org.sonatype.nexus.repository.Repository;
import org.sonatype.nexus.repository.content.maintenance.ContentMaintenanceFacet;
import org.sonatype.nexus.repository.pypi.datastore.PypiContentFacet;

@Named
@Singleton
public class PyPiDataStoreTestHelper
    implements PyPiTestHelper
{
  @Override
  public void deleteComponent(final Repository repository, final String name, final String version)
  {
    PypiContentFacet contentFacet = repository.facet(PypiContentFacet.class);
    ContentMaintenanceFacet maintenanceFacet = repository.facet(ContentMaintenanceFacet.class);
    contentFacet.components().name(name).version(version).find().map(maintenanceFacet::deleteComponent);
  }

  @Override
  public boolean isRootIndexExist(final Repository repository) {
    return repository.facet(PypiContentFacet.class).getAsset("/simple/").isPresent();
  }
}
