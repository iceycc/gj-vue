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
    let count = getCount(order.corpList);

    switch (order.status) {
        case 0: //待处理
            array = array.concat([2, 3, 4]);

            if (count === 0) {
                array = array.concat([1]);
            } else if (count < 3) {
                array = array.concat([0, 1]);
            } else {
                array = array.concat([0]);
            }
            break;
        case 1: //已分配
            array = array.concat([0]);
            if (count < 3) {
                array = array.concat([1]);
            }

            if (order.orderCharge) {
                array = array.concat([5]);
            } else if (order.orderMsgFee) {
                //do nothing
            } else {
                array = array.concat([3, 4]);
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

function getCount(list) {
    let count = 0;
    list.forEach((item) => {
        if (item.corpStatus == 0) {
            count++;
        }
    });
    return count;
}

export {handleOrderButton};