namespace cool {
    const SCREEN_HALF_WIDTH = screen.width >> 1;
    const SCREEN_HALF_HEIGHT = screen.height >> 1;

    export class Sprite extends scene.Renderable {
        private xfrm_: Transform;
        private src_: Vertex[]; // const
        private verts_: Vertex[];

        public get xfrm() { return this.xfrm_; }
        public get verts() { return this.verts_; }

        constructor(private img: Image, z: number = scene.SPRITE_Z) {
            super(
                (_1, _2) => { },
                () => true,
                z);
            this.xfrm_ = new Transform();
            this.setImage(img);
        }

        public setImage(img: Image) {
            this.img = img;
            const w2 = Fx8(img.width / 2);
            const h2 = Fx8(img.height / 2);
            // Vertices in clockwise order
            this.src_ = [
                new Vertex(new Vec2(Fx.neg(w2), Fx.neg(h2)), new Vec2(Fx.zeroFx8, Fx.zeroFx8)),
                new Vertex(new Vec2(w2, Fx.neg(h2)), new Vec2(Fx.oneFx8, Fx.zeroFx8)),
                new Vertex(new Vec2(w2, h2), new Vec2(Fx.oneFx8, Fx.oneFx8)),
                new Vertex(new Vec2(Fx.neg(w2), h2), new Vec2(Fx.zeroFx8, Fx.oneFx8))
            ];
            this.verts_ = this.src_.map(v => v.clone());
        }

        __update(camera: scene.Camera, _2: any) {
            for (let i = 0; i < this.src_.length; ++i) {
                this.xfrm_.transformToRef(this.src_[i].pos, this.verts_[i].pos);
                this.verts_[i].pos.x = Fx.iadd(camera.drawOffsetX + SCREEN_HALF_WIDTH, this.verts_[i].pos.x);
                this.verts_[i].pos.y = Fx.iadd(camera.drawOffsetY + SCREEN_HALF_HEIGHT, this.verts_[i].pos.y);
            }
        }

        __drawCore(_1: any) {
            gpu.drawTexturedQuad(
                screen,
                this.img,
                this.verts[0].pos.x as any as number,
                this.verts[0].pos.y as any as number,
                this.verts[0].uv.x as any as number,
                this.verts[0].uv.y as any as number,
                this.verts[1].pos.x as any as number,
                this.verts[1].pos.y as any as number,
                this.verts[1].uv.x as any as number,
                this.verts[1].uv.y as any as number,
                this.verts[2].pos.x as any as number,
                this.verts[2].pos.y as any as number,
                this.verts[2].uv.x as any as number,
                this.verts[2].uv.y as any as number,
                this.verts[3].pos.x as any as number,
                this.verts[3].pos.y as any as number,
                this.verts[3].uv.x as any as number,
                this.verts[3].uv.y as any as number);
        }
    }
}
