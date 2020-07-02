import qiniu from 'qiniu'
import config  from '../config/index'

export function getUploadToken() {
    const options = {
        scope: 'icelt',
        expires: 7200,
        returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)"}'
    };

    const mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);

    const putPolicy = new qiniu.rs.PutPolicy(options);

    const uploadToken = putPolicy.uploadToken(mac);

    return uploadToken
}