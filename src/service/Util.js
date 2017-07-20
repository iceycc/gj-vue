/**
 0:分配经理
 1:分配公司
 2:无法承接
 3:收费单
 4:信息费
 5:取消收费单

 status:   0:待处理  1:已分配  2:无法承接
 orderCharge :收费单
 orderMsgFee :信息费(属于无法承接状态)
 */
function handleOrderButton(order) {
    let array = [];

    switch (order.status) {
        case 0: //待处理
            array = array.concat([0, 2, 3, 4]);
            break;
        case 1: //已分配
            if (order.corpInfo.length < 3) {
                array = array.concat([1]);
            }

            if (order.orderCharge) {
                array = array.concat([5]);
            } else if (order.orderMsgFee) {
                //do nothing
            } else {
                array = array.concat([2, 3, 4]);
            }
            break;
        case 2: //无法承接
            if (!order.orderMsgFee) {
                array = array.concat([4]);
            }
            break;
        default:
            break;
    }
    return array;
}

export {handleOrderButton};