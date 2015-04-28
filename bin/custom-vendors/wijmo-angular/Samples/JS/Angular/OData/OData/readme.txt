OData
------------------------------------------------------------------------------
Shows how to extend our CollectionView class to connect to an OData service and provide filtering, sorting, and paging.

OData is a standardized protocol for creating and consuming data APIs. 
OData builds on core protocols like HTTP and commonly accepted methodologies like REST. 
The result is a uniform way to expose full-featured data APIs. (http://www.odata.org/)

The ODataCollectionView class in this sample extends the Wijmo CollectionView 
class to connect to OData services. ODataCollectionView loads data from OData 
tables. You can select whether you want sorting and paging to be performed on 
the server or on the client.

Changes made to the view are automatically persisted on the server.

The ODataCollectionView class supports basic authentication as described in
http://msdn.microsoft.com/en-us/data/gg192997.aspx. When accessing data sources
that require authentication, make sure the "serverSettings" parameter in the
ODataCollectionView constructor includes "user" and "password" values. For example:

var cv = new wijmo.data.ODataCollectionView(
	{ serviceUrl: svcUrl, entityName: 'Categories' },		// URL and name
    ['Category_ID'],	// key(s)
    { serverSettings: { user: user, password: password } },	// settings
    dataTypes,			// data type mappings
	loaded,				// call back
	true);				// load all data

You can use the result objects from the OData service as data sources for any
Wijmo controls, and in addition to full CRUD support and real-time updates you
automatically get CollectionView features including sorting, filtering, paging,
and grouping.

