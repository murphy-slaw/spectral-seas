StartupEvents.registry('mob_effect', (event) => {
    event
        .create('spectral_seas:hydrodynamic')
        .color(0x495e27)
        .beneficial()
        .modifyAttribute(
            'porting_lib:swim_speed',
            '41466201-1a84-4066-8ec2-79047f6f5615',
            0.25,
            'multiply_total'
        )
})
