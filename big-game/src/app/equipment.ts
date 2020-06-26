export class Equipment {
        saddleId: string;
        name: string;
        color: string;
        equipment: string;
        img_file: string;
        id: string;
        group: string;
        dressage_: number;
        gallop_: number;
        jumping_: number;
        speed_: number;
        stamina_: number;
        trot_: number;
        
    constructor(name: string, color: string, equipment: string, img_file: string, id: string, group: string,
        dressage_: number, gallop_: number, jumping_: number, speed_: number, stamina_: number, trot_: number) {
        this.name = name;
        this.color = color;
        this.equipment = equipment;
        this.img_file = img_file;
        this.id = id;
        this.group = group;
        this.dressage_ = dressage_;
        this.gallop_ = gallop_;
        this.jumping_ = jumping_;
        this.speed_ = speed_;
        this.stamina_ = stamina_;
        this.trot_ = trot_;
    }
}

