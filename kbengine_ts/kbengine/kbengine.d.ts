/**
 * KBEngine的html5客户端扩展ts版   2.x版本
 * cocos creator 环境下使用方法
 *
 * 注：（下面的是重点）
 *      1、实体声明的命名空间为KBEngine.Entities,与官方的KBEngine不同
 *      2、 @KBEngine.registerEntity()    ///  TODO: <---组件使用@KBEngine.registerComponent()
            export default class Account extends KBEngine.Entity {      ///  TODO: 组件继承自KBEngine.EntityComponent,类名等于服务器(实体/组件)名
                __comps__ = {组件名:组件类型}    ///TODO: 因为组件类型不会从服务器同步，只能获取到EntityComponent，无法获取具体类型，所以需要在实体里进行手动设置，需要代码提示可以手动声明一下
                __init__() {
                    console.log('创建account')
                }
            }
            //这里加入声明用于vscode代码提示
            declare global {
                namespace KBEngine {
                    interface IEntities{
                        Account:new ()=>Account
                    }
                }
            }

 *      3、cocos creator编辑器下会出现KBEngine未找到的问题，不影响运行，如果想去掉，将允许编辑器加载勾选
        4、因为下班了，组件的basecall和cellcall还未测试，改天再继续
 */
declare namespace KBEngine {
    const CLIENT_VERSION = "2.5.0";
    const CLIENT_SCRIPT_VERSION = "0.1.0";
    const PACKET_MAX_SIZE = 1500;
    const PACKET_MAX_SIZE_TCP = 1460;
    const PACKET_MAX_SIZE_UDP = 1472;
    const MESSAGE_ID_LENGTH = 2;
    const MESSAGE_LENGTH_LENGTH = 2;
    const MESSAGE_LENGTH1_LENGTH = 4;
    const MESSAGE_MAX_SIZE = 65535;
    const CLIENT_NO_FLOAT = 0;
    const KBE_FLT_MAX = 3.402823466e+38;
}
declare namespace KBEngine {
    class INT64 {
        constructor(lo: any, hi: any);
        lo: number;
        hi: number;
        sign: number;
        toString(): string;
    }
    class UINT64 {
        constructor(lo: any, hi: any);
        lo: number;
        hi: number;
        toString(): string;
    }
}
declare namespace KBEngine {
    function getQualifiedClassName(value: any): any;
}
declare namespace KBEngine {
    /** todo 调试输出模块，这里需要根据使用的引擎不同在这里加入判断条件 */
    function INFO_MSG(...args: any[]): void;
    function DEBUG_MSG(...args: any[]): void;
    function ERROR_MSG(...args: any[]): void;
    function WARNING_MSG(...args: any[]): void;
}
declare namespace KBEngine {
    function utf8ArrayToString(array: Array<any>): any;
    function stringToUTF8Bytes(str: string): any[];
}
declare namespace KBEngine {
    class EventInfo {
        classinst: any;
        callbackfn: any;
        constructor(classinst: any, callbackfn: any);
    }
    class FiredEvent {
        evtName: any;
        evtInfo: any;
        ars: any;
        constructor(evtName: any, evtInfo: any, ars: any);
    }
    interface IEvents {
        [evtName: string]: EventInfo[];
    }
    class Events {
        constructor();
        _events: IEvents;
        _isPause: boolean;
        _firedEvents: FiredEvent[];
        register(evtName: string, classinst: any, strCallback: string): void;
        deregisterAll(classinst: any): void;
        deregister(evtName: string, classinst: any): void;
        removeAllFiredEvent(classinst: any): void;
        removeFiredEvent(evtName: string, classinst: any): void;
        fire(evtName: string, ...args: any[]): void;
        pasue(): void;
        resume(): void;
        clear(): void;
    }
    const Event: Events;
}
declare namespace KBEngine {
    class PackFloatXType {
        _unionData: ArrayBuffer;
        fv: Float32Array;
        uv: Uint32Array;
        iv: Int32Array;
    }
    const _xPackData: PackFloatXType;
    const _yPackData: PackFloatXType;
    const _zPackData: PackFloatXType;
    class MemoryStream {
        constructor(size_or_buffer: number | ArrayBuffer);
        buffer: ArrayBuffer;
        rpos: number;
        wpos: number;
        readInt8(): number;
        readInt16(): number;
        readInt32(): number;
        readInt64(): INT64;
        readUint8(): number;
        readUint16(): number;
        readUint32(): number;
        readUint64(): UINT64;
        readFloat(): any;
        readDouble(): any;
        readString(): string;
        readBlob(): Uint8Array;
        readStream(): MemoryStream;
        readPackXZ(): any[];
        readPackY(): number;
        writeInt8(v: any): void;
        writeInt16(v: any): void;
        writeInt32(v: any): void;
        writeInt64(v: any): void;
        writeUint8(v: any): void;
        writeUint16(v: any): void;
        writeUint32(v: any): void;
        writeUint64(v: UINT64): void;
        writeFloat(v: any): void;
        writeDouble(v: any): void;
        writeBlob(v: any): void;
        writeString(v: any): void;
        append(stream: MemoryStream, offset: number, size: number): void;
        readSkip(v: any): void;
        space(): number;
        length(): number;
        readEOF(): boolean;
        done(): void;
        getbuffer(): ArrayBuffer;
        setbuffer(buffer: ArrayBuffer): void;
        size(): number;
        clear(): void;
        reclaimObject(): void;
    }
    module MemoryStream {
        const _objects: MemoryStream[];
        function createObject(): MemoryStream;
    }
}
declare namespace KBEngine {
    class Bundle {
        static _objects: Bundle[];
        static createObject(): Bundle;
        constructor();
        memorystreams: Array<MemoryStream>;
        stream: MemoryStream;
        numMessage: number;
        messageLengthBuffer: Uint8Array;
        msgtype: any;
        messageLength: number;
        newMessage(msgtype: any): void;
        writeMsgLength(v: any): void;
        fini(issend: any): void;
        send(network: any): void;
        checkStream(v: any): void;
        writeInt8(v: any): void;
        writeInt16(v: any): void;
        writeInt32(v: any): void;
        writeInt64(v: any): void;
        writeUint8(v: any): void;
        writeUint16(v: any): void;
        writeUint32(v: any): void;
        writeUint64(v: any): void;
        writeFloat(v: any): void;
        writeDouble(v: any): void;
        writeString(v: any): void;
        writeBlob(v: any): void;
        clear(): void;
        reclaimObject(): void;
    }
    const reader: MemoryStream;
    interface IDataType2Id {
        [type: string]: number;
    }
    let datatype2id: IDataType2Id;
    function mappingDataType(): void;
    function bindWriter(writer: any, argType: number): any;
    function bindReader(argType: number): () => any;
    class Message {
        id: any;
        name: any;
        length: any;
        argsType: any;
        args: any;
        handler: any;
        constructor(id: any, name: any, length: any, argsType: any, args: any, handler: any);
        createFromStream(msgstream: any): any;
        handleMessage(msgstream: any): void;
    }
    module messages {
        const loginapp: {};
        const baseapp: {};
        const Loginapp_importClientMessages: Message;
        const Baseapp_importClientMessages: Message;
        const Baseapp_importClientEntityDef: Message;
        const onImportClientMessages: Message;
    }
    let clientmessages: {};
    let bufferedCreateEntityMessages: {};
}
declare namespace KBEngine {
    class Vector2 {
        x: number;
        y: number;
        constructor(x: number, y: number);
        distance(pos: Vector2): number;
        add(vec2: Vector2): this;
        sub(vec2: Vector2): this;
        mul(num: number): this;
        div(num: number): this;
        neg(): this;
    }
    class Vector3 {
        x: number;
        y: number;
        z: number;
        constructor(x: number, y: number, z: number);
        distance(pos: Vector3): number;
        add(vec3: Vector3): this;
        sub(vec3: Vector3): this;
        mul(num: number): this;
        div(num: number): this;
        neg(): this;
    }
    class Vector4 {
        x: number;
        y: number;
        z: number;
        w: number;
        constructor(x: number, y: number, z: number, w: number);
        distance(pos: Vector4): number;
        add(vec4: Vector4): this;
        sub(vec4: Vector4): this;
        mul(num: number): this;
        div(num: number): this;
        neg(): this;
    }
    function clampf(value: any, min_inclusive: any, max_inclusive: any): any;
    function int82angle(angle: number, half: boolean): number;
    function angle2int8(v: number, half: boolean): number;
}
declare namespace KBEngine {
    interface IEntities {
    }
    const Entities: IEntities;
    class Entity {
        constructor();
        protected __comps__: {
            [compName: string]: new () => EntityComponent;
        };
        id: number;
        className: string;
        position: Vector3;
        direction: Vector3;
        velocity: number;
        cell: any;
        base: any;
        inWorld: boolean;
        inited: boolean;
        isControlled: boolean;
        entityLastLocalPos: Vector3;
        entityLastLocalDir: Vector3;
        isOnGround: boolean;
        __init__(): void;
        attachComponents(): void;
        getComponents(compName: string, all?: boolean): any;
        detachComponents(): void;
        callPropertysSetMethods(): void;
        onDestroy(): void;
        onControlled(bIsControlled: any): void;
        isPlayer(): boolean;
        baseCall(type: string, ...params: any[]): void;
        cellCall(type: string, ...params: any[]): void;
        enterWorld(): void;
        onComponentsEnterworld(): void;
        onComponentsLeaveworld(): void;
        onEnterWorld(): void;
        leaveWorld(): void;
        onLeaveWorld(): void;
        enterSpace(): void;
        onEnterSpace(): void;
        leaveSpace(): void;
        onLeaveSpace(): void;
        set_position(): void;
        onUpdateVolatileData(): void;
        onUpdatePropertys(stream: MemoryStream): void;
        set_direction(old: any): void;
        onRemoteMethodCall(stream: MemoryStream): void;
    }
    function registerEntity(): (ctor: new () => Entity) => void;
}
declare namespace KBEngine {
    class EntityComponent {
        id: number;
        entityComponentPropertyID: number;
        componentType: number;
        ownerID: number;
        owner: Entity;
        className: string;
        base: EntityComponentCall;
        cell: EntityComponentCall;
        protected onAttached(owner: Entity): void;
        protected onDetached(owner: Entity): void;
        protected onEnterWorld(): void;
        protected onLeaveWorld(): void;
        baseCall(type: string, ...params: any[]): void;
        cellCall(type: string, ...params: any[]): void;
        onUpdatePropertys(propUtype: number, stream: MemoryStream, maxCount: number): void;
        onRemoteMethodCall(propUtype: number, stream: MemoryStream): void;
        createFromStream(stream: MemoryStream, ecpId: number): void;
    }
    function registerComponent(): (ctor: new () => EntityComponent) => void;
}
declare namespace KBEngine {
    const ENTITYCALL_TYPE_CELL = 0;
    const ENTITYCALL_TYPE_BASE = 1;
    class EntityCall {
        constructor();
        id: number;
        className: string;
        type: number;
        networkInterface: KBEngineApp;
        bundle: any;
        isBase(): boolean;
        isCell(): boolean;
        newCall(): any;
        sendCall(bundle?: Bundle): void;
    }
    class EntityComponentCall extends EntityCall {
        entityComponentPropertyID: number;
        constructor(ecpId: number, eid: number, className: string);
    }
    class DATATYPE_UINT8 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_UINT16 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_UINT32 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_UINT64 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_INT8 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_INT16 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_INT32 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_INT64 {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_FLOAT {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): number;
        isSameType(v: any): boolean;
    }
    class DATATYPE_DOUBLE extends DATATYPE_FLOAT {
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
    }
    class DATATYPE_STRING {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): string;
        isSameType(v: any): boolean;
    }
    class DATATYPE_VECTOR2 {
        bind(): void;
        createFromStream(stream: any): Vector2;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Vector2;
        isSameType(v: any): boolean;
    }
    class DATATYPE_VECTOR3 {
        bind(): void;
        createFromStream(stream: any): Vector3;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Vector3;
        isSameType(v: any): boolean;
    }
    class DATATYPE_VECTOR4 {
        bind(): void;
        createFromStream(stream: any): Vector4;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Vector4;
        isSameType(v: any): boolean;
    }
    class DATATYPE_PYTHON {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Uint8Array;
        isSameType(v: any): boolean;
    }
    class DATATYPE_UNICODE {
        bind(): void;
        createFromStream(stream: any): any;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): string;
        isSameType(v: any): boolean;
    }
    class DATATYPE_ENTITYCALL {
        bind(): void;
        createFromStream(stream: any): void;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Uint8Array;
        isSameType(v: any): boolean;
    }
    class DATATYPE_BLOB {
        bind(): void;
        createFromStream(stream: any): Uint8Array;
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): Uint8Array;
        isSameType(v: any): boolean;
    }
    class DATATYPE_ARRAY {
        type: any;
        bind(): void;
        createFromStream(stream: any): any[];
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): any[];
        isSameType(v: any): boolean;
    }
    class DATATYPE_FIXED_DICT {
        dicttype: {};
        implementedBy: any;
        bind(): void;
        createFromStream(stream: any): {};
        addToStream(stream: any, v: any): void;
        parseDefaultValStr(v: any): {};
        isSameType(v: any): boolean;
    }
    module datatypes {
        const UINT8: DATATYPE_UINT8;
        const UINT16: DATATYPE_UINT16;
        const UINT32: DATATYPE_UINT32;
        const UINT64: DATATYPE_UINT64;
        const INT8: DATATYPE_INT8;
        const INT16: DATATYPE_INT16;
        const INT32: DATATYPE_INT32;
        const INT64: DATATYPE_INT64;
        const FLOAT: DATATYPE_FLOAT;
        const DOUBLE: DATATYPE_DOUBLE;
        const STRING: DATATYPE_STRING;
        const VECTOR2: DATATYPE_VECTOR2;
        const VECTOR3: DATATYPE_VECTOR3;
        const VECTOR4: DATATYPE_VECTOR4;
        const PYTHON: DATATYPE_PYTHON;
        const UNICODE: DATATYPE_UNICODE;
        const ENTITYCALL: DATATYPE_ENTITYCALL;
        const BLOB: DATATYPE_BLOB;
    }
}
declare namespace KBEngine {
    class KBEngineArgs {
        ip: string;
        port: number;
        updateHZ: number;
        serverHeartbeatTick: number;
        isWss: boolean;
        readonly protocol: string;
        forceBasePort: number;
        clientType: number;
        isOnInitCallPropertysSetMethods: boolean;
    }
    const EventTypes: {
        createAccount: string;
        login: string;
        logout: string;
        reloginBaseapp: string;
        bindAccountEmail: string;
        newPassword: string;
        onKicked: string;
        onDisconnected: string;
        onConnectionState: string;
        onCreateAccountResult: string;
        onVersionNotMatch: string;
        onScriptVersionNotMatch: string;
        onLoginFailed: string;
        onLoginBaseapp: string;
        onLoginBaseappFailed: string;
        onReloginBaseapp: string;
        onReloginBaseappSuccessfully: string;
        onReloginBaseappFailed: string;
        onEnterWorld: string;
        onLeaveWorld: string;
        onEnterSpace: string;
        onLeaveSpace: string;
        set_position: string;
        set_direction: string;
        updatePosition: string;
        addSpaceGeometryMapping: string;
        onSetSpaceData: string;
        onDelSpaceData: string;
        onControlled: string;
        onLoseControlledEntity: string;
        onStreamDataStarted: string;
        onStreamDataRecv: string;
        onStreamDataCompleted: string;
    };
}
declare namespace KBEngine {
    const moduledefs: {};
    class KBEngineApp {
        args: KBEngineArgs;
        constructor(args: KBEngineArgs);
        baseappIp: string;
        username: string;
        password: string;
        clientdatas: string;
        encryptedKey: string;
        loginappMessageImported: boolean;
        baseappMessageImported: boolean;
        serverErrorsDescrImported: boolean;
        entitydefImported: boolean;
        useAliasEntityID: boolean;
        serverErrs: {
            [err: string]: ServerErr;
        };
        baseappIP: string;
        baseappPort: number;
        baseappUdpPort: number;
        currMsgID: number;
        currMsgCount: number;
        currMsgLen: number;
        fragmentStream: any;
        fragmentDatasFlag: number;
        fragmentDatasRemain: number;
        socket: any;
        currserver: string;
        currstate: string;
        currconnect: string;
        serverdatas: string;
        serverVersion: string;
        serverScriptVersion: string;
        serverProtocolMD5: string;
        serverEntityDefMD5: string;
        clientVersion: string;
        clientScriptVersion: string;
        entity_uuid: any;
        entity_id: number;
        entity_type: string;
        entityServerPos: Vector3;
        entities: {};
        entityIDAliasIDList: any[];
        controlledEntities: any[];
        spacedata: {};
        spaceID: number;
        spaceResPath: string;
        isLoadedGeometry: boolean;
        lastTickTime: number;
        lastTickCBTime: number;
        component: any;
        msgStream: MemoryStream;
        resetSocket(): void;
        reset(): void;
        installEvents(): void;
        uninstallEvents(): void;
        hello(): void;
        player(): any;
        findEntity(entityID: any): any;
        connect(host: any, port: any): void;
        disconnect(): void;
        onopen(): void;
        onerror_before_onopen(evt: any): void;
        onerror_after_onopen(evt: any): void;
        onmessage(msg: any): void;
        writeFragmentMessage(FragmentDataType: any, stream: MemoryStream, datasize: any): void;
        mergeFragmentMessage(stream: MemoryStream): boolean | 0;
        onclose(): void;
        send(msg: any): void;
        close(): void;
        update(): void;
        Client_onAppActiveTickCB(): void;
        serverErr(id: any): string;
        Client_onImportServerErrorsDescr(stream: any): void;
        Client_onImportClientSdk(stream: MemoryStream): void;
        onOpenLoginapp_login(): void;
        onOpenLoginapp_createAccount(): void;
        onImportClientMessagesCompleted(): void;
        createDataTypeFromStreams(stream: any, canprint: any): void;
        createDataTypeFromStream(stream: any, canprint: any): void;
        Client_onImportClientEntityDef(stream: any): void;
        Client_onVersionNotMatch(stream: any): void;
        Client_onScriptVersionNotMatch(stream: any): void;
        onImportEntityDefCompleted(): void;
        importClientMessages(stream: any): void;
        Client_onImportClientMessages(msg: any): void;
        createAccount(username: any, password: any, datas: any): void;
        createAccount_loginapp(noconnect: any): void;
        bindAccountEmail(emailAddress: any): void;
        newPassword(old_password: any, new_password: any): void;
        logout(): void;
        login(username: any, password: any, datas: any): void;
        login_loginapp(noconnect: any): void;
        onOpenLoginapp_resetpassword(): void;
        reset_password(username: any): void;
        resetpassword_loginapp(noconnect: any): void;
        onOpenBaseapp(): void;
        login_baseapp(noconnect: any): void;
        reloginBaseapp(): void;
        onReOpenBaseapp(): void;
        Client_onHelloCB(args: any): void;
        Client_onLoginFailed(args: any): void;
        Client_onLoginSuccessfully(args: any): void;
        Client_onLoginBaseappFailed(failedcode: any): void;
        Client_onReloginBaseappFailed(failedcode: any): void;
        Client_onReloginBaseappSuccessfully(stream: any): void;
        entityclass: {};
        getentityclass(entityType: any): any;
        Client_onCreatedProxies(rndUUID: any, eid: any, entityType: any): void;
        getViewEntityIDFromStream(stream: any): number;
        onUpdatePropertys_(eid: any, stream: any): void;
        Client_onUpdatePropertysOptimized(stream: any): void;
        Client_onUpdatePropertys(stream: any): void;
        onRemoteMethodCall_(eid: any, stream: any): void;
        Client_onRemoteMethodCallOptimized(stream: any): void;
        Client_onRemoteMethodCall(stream: any): void;
        Client_onEntityEnterWorld(stream: any): void;
        Client_onEntityLeaveWorldOptimized(stream: any): void;
        Client_onEntityLeaveWorld(eid: any): void;
        Client_onEntityDestroyed(eid: any): void;
        Client_onEntityEnterSpace(stream: any): void;
        Client_onEntityLeaveSpace(eid: any): void;
        Client_onKicked(failedcode: any): void;
        Client_onCreateAccountResult(stream: any): void;
        Client_onControlEntity(eid: any, isControlled: any): void;
        updatePlayerToServer(): void;
        addSpaceGeometryMapping(spaceID: any, respath: any): void;
        clearSpace(isAll: any): void;
        clearEntities(isAll: any): void;
        Client_initSpaceData(stream: any): void;
        Client_setSpaceData(spaceID: any, key: any, value: any): void;
        Client_delSpaceData(spaceID: any, key: any): void;
        Client_getSpaceData(spaceID: any, key: any): any;
        Client_onUpdateBasePos(x: any, y: any, z: any): void;
        Client_onUpdateBasePosXZ(x: any, z: any): void;
        Client_onUpdateData(stream: any): void;
        Client_onSetEntityPosAndDir(stream: any): void;
        Client_onUpdateData_ypr(stream: any): void;
        Client_onUpdateData_yp(stream: any): void;
        Client_onUpdateData_yr(stream: any): void;
        Client_onUpdateData_pr(stream: any): void;
        Client_onUpdateData_y(stream: any): void;
        Client_onUpdateData_p(stream: any): void;
        Client_onUpdateData_r(stream: any): void;
        Client_onUpdateData_xz(stream: any): void;
        Client_onUpdateData_xz_ypr(stream: any): void;
        Client_onUpdateData_xz_yp(stream: any): void;
        Client_onUpdateData_xz_yr(stream: any): void;
        Client_onUpdateData_xz_pr(stream: any): void;
        Client_onUpdateData_xz_y(stream: any): void;
        Client_onUpdateData_xz_p(stream: any): void;
        Client_onUpdateData_xz_r(stream: any): void;
        Client_onUpdateData_xyz(stream: any): void;
        Client_onUpdateData_xyz_ypr(stream: any): void;
        Client_onUpdateData_xyz_yp(stream: any): void;
        Client_onUpdateData_xyz_yr(stream: any): void;
        Client_onUpdateData_xyz_pr(stream: any): void;
        Client_onUpdateData_xyz_y(stream: any): void;
        Client_onUpdateData_xyz_p(stream: any): void;
        Client_onUpdateData_xyz_r(stream: any): void;
        Client_onUpdateData_ypr_optimized(stream: any): void;
        Client_onUpdateData_yp_optimized(stream: any): void;
        Client_onUpdateData_yr_optimized(stream: any): void;
        Client_onUpdateData_pr_optimized(stream: any): void;
        Client_onUpdateData_y_optimized(stream: any): void;
        Client_onUpdateData_p_optimized(stream: any): void;
        Client_onUpdateData_r_optimized(stream: any): void;
        Client_onUpdateData_xz_optimized(stream: any): void;
        Client_onUpdateData_xz_ypr_optimized(stream: any): void;
        Client_onUpdateData_xz_yp_optimized(stream: any): void;
        Client_onUpdateData_xz_yr_optimized(stream: any): void;
        Client_onUpdateData_xz_pr_optimized(stream: any): void;
        Client_onUpdateData_xz_y_optimized(stream: any): void;
        Client_onUpdateData_xz_p_optimized(stream: any): void;
        Client_onUpdateData_xz_r_optimized(stream: any): void;
        Client_onUpdateData_xyz_optimized(stream: any): void;
        Client_onUpdateData_xyz_ypr_optimized(stream: any): void;
        Client_onUpdateData_xyz_yp_optimized(stream: any): void;
        Client_onUpdateData_xyz_yr_optimized(stream: any): void;
        Client_onUpdateData_xyz_pr_optimized(stream: any): void;
        Client_onUpdateData_xyz_y_optimized(stream: any): void;
        Client_onUpdateData_xyz_p_optimized(stream: any): void;
        Client_onUpdateData_xyz_r_optimized(stream: any): void;
        _updateVolatileData(entityID: any, x: any, y: any, z: any, yaw: any, pitch: any, roll: any, isOnGround: any, isOptimized?: boolean): void;
        Client_onStreamDataStarted(id: any, datasize: any, descr: any): void;
        Client_onStreamDataRecv(stream: any): void;
        Client_onStreamDataCompleted(id: any): void;
        Client_onReqAccountResetPasswordCB(failedcode: any): void;
        Client_onReqAccountBindEmailCB(failedcode: any): void;
        Client_onReqAccountNewPasswordCB(failedcode: any): void;
    }
    class ServerErr {
        name: string;
        descr: string;
        id: number;
    }
    const FragmentDataTypes: {
        FRAGMENT_DATA_UNKNOW: number;
        FRAGMENT_DATA_MESSAGE_ID: number;
        FRAGMENT_DATA_MESSAGE_LENGTH: number;
        FRAGMENT_DATA_MESSAGE_LENGTH1: number;
        FRAGMENT_DATA_MESSAGE_BODY: number;
    };
    let app: KBEngineApp;
    function create(args: KBEngineArgs): void;
    function destroy(): void;
}
