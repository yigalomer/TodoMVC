/*
 * Observer design pattern implementation
 *
 * The Observer design pattern defines a one-to-many dependency between a subject object
 * and any number of observer objects, so that when the subject object changes state,
 * all its observer objects are notified and updated automatically.
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */

function Subject()
{
    this.mObservers = new ArrayList();
    this.mMessage = "" ;
}

Subject.prototype.notify = function( context )
{
    var count = this.mObservers.count();

    for( var i = 0; i < count; i++ )
        this.mObservers.getAt(i).handelEvents( context );
}

Subject.prototype.addObserver = function( observer )
{
    if( !observer.handelEvents )
        throw 'Wrong parameter';

    this.mObservers.Add( observer );
}

Subject.prototype.removeObserver = function( observer )
{
    if( !observer.handelEvents )
        throw 'Wrong parameter';

    this.mObservers.removeAt(this.mObservers.indexOf( observer, 0 ));
}

Subject.prototype.getUpdate = function( observer )
{
    if( !observer.handelEvents )
        throw 'Wrong parameter';

    return this.mMessage;
}



function Observer()
{
    //   this.handelEvents = function()
//    {
//       return;
//    }
}
